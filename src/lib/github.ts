export type RepoStats = { stars: number; forks: number }

export function parseRepoFromUrl(url: string): string | null {
    const m = url.match(/github\.com\/([^/]+\/[^/?#]+)/)
    return m ? m[1].replace(/\.git$/, "") : null
}

export async function getRepoStats(repos: string[]): Promise<Record<string, RepoStats>> {
    const token = process.env.GITHUB_TOKEN
    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if (token) headers.Authorization = `Bearer ${token}`

    const entries = await Promise.all(
        repos.map(async (repo): Promise<[string, RepoStats]> => {
            try {
                const res = await fetch(`https://api.github.com/repos/${repo}`, {
                    headers,
                    next: { revalidate: 600 },
                })
                if (!res.ok) return [repo, { stars: 0, forks: 0 }]
                const data = await res.json()
                return [repo, { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 }]
            } catch {
                return [repo, { stars: 0, forks: 0 }]
            }
        })
    )
    return Object.fromEntries(entries)
}
