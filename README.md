# Orange Gopher

Static website for [orangegopher.dev](https://orangegopher.dev), an open source hub for Go adapters and proxy Workers for Cloudflare tools.

## Projects data

Projects live in [`projects.json`](./projects.json). Add a project with:

```json
{
  "name": "go-d1",
  "description": "Use Cloudflare D1 from Go through a Go adapter and Worker proxy.",
  "github_repo": "https://github.com/mdmourao/go-d1",
  "proxy_repo": "https://github.com/mdmourao/go-d1-proxy",
  "docs_link": "https://pkg.go.dev/github.com/mdmourao/go-d1",
  "cloudflare_tags_stack": ["D1", "Workers"]
}
```
