export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, content } = req.body;

  // Basic authentication
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'KindNusaif';
  const repo = process.env.GITHUB_REPO || 'Personal-Portfolio';
  const path = 'src/data/content.json';
  
  if (!token) {
    return res.status(500).json({ error: 'GitHub token not configured on server' });
  }

  try {
    // 1. Get the current file to get its SHA
    const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      throw new Error(`Failed to fetch file info: ${getRes.statusText}`);
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Update the file
    // Content must be base64 encoded for GitHub API
    const encodedContent = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
    
    const updateRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update content via Admin Portal',
        content: encodedContent,
        sha: sha,
        branch: 'main'
      })
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      throw new Error(`Failed to update file: ${JSON.stringify(errorData)}`);
    }

    return res.status(200).json({ success: true, message: 'Content updated successfully. Vercel will rebuild the site in ~1-2 minutes.' });
  } catch (error: any) {
    console.error('Error updating content:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
