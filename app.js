const projectGrid = document.querySelector("#project-grid");

const normaliseProject = (project) => ({
  name: project.name,
  description: project.description,
  githubRepo: project.github_repo,
  proxyRepo: project.proxy_repo,
  docsLink: project.docs_link,
  stack: project.cloudflare_tags_stack || []
});

const externalLink = (href, label) => {
  if (!href) {
    return null;
  }

  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener noreferrer";
  link.target = "_blank";
  link.textContent = label;
  return link;
};

const renderProject = (project) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.projectCard = "";

  const header = document.createElement("div");
  header.className = "project-card-header";

  const titleGroup = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "project-kicker";
  kicker.textContent = "Go package";

  const title = document.createElement("h3");
  title.textContent = project.name;

  titleGroup.append(kicker, title);

  const tags = document.createElement("div");
  tags.className = "tag-list";
  tags.setAttribute("aria-label", "Cloudflare stack");

  project.stack.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tags.append(tagElement);
  });

  header.append(titleGroup, tags);

  const description = document.createElement("p");
  description.textContent = project.description;

  const links = document.createElement("div");
  links.className = "project-links";
  [
    externalLink(project.githubRepo, "Repository"),
    externalLink(project.proxyRepo, "Proxy"),
    externalLink(project.docsLink, "Docs")
  ].forEach((link) => {
    if (link) {
      links.append(link);
    }
  });

  card.append(header, description, links);
  return card;
};

const loadProjects = async () => {
  if (!projectGrid) {
    return;
  }

  const showMessage = (text) => {
    const message = document.createElement("p");
    message.className = "project-grid-loading";
    message.textContent = text;
    projectGrid.replaceChildren(message);
  };

  try {
    const response = await fetch("/projects.json", {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Could not load projects.json: ${response.status}`);
    }

    const data = await response.json();
    const projects = (data.projects || []).map(normaliseProject);

    if (projects.length > 0) {
      projectGrid.replaceChildren(...projects.map(renderProject));
    } else {
      showMessage("No projects available yet.");
    }
  } catch (error) {
    console.warn(error);
    showMessage("Could not load projects. See projects.json.");
  } finally {
    projectGrid.removeAttribute("aria-busy");
  }
};

loadProjects();
