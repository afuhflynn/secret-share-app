export const localStorageKey = "local-user-key";

export const codeApiExamples = [
  {
    id: 1,
    title: "JavaScript / Node.js",
    content: `const axios = require('axios');

async function createSecret(content, expiryTime) {
  const response = await axios.post('https://secretshare.com/api/v1/secrets', {
    content,
    expiryTime
  }, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  return response.data;
}

// Example usage
createSecret('API_KEY=your_api_key', '7d')
  .then(secret => console.log(secret))
  .catch(error => console.error(error));`,
  },
  {
    id: 2,
    title: "Python",
    content: `import requests

def create_secret(content, expiry_time):
    url = "https://secretshare.com/api/v1/secrets"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY"
    }
    payload = {
        "content": content,
        "expiryTime": expiry_time
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

# Example usage
secret = create_secret("API_KEY=your_api_key", "7d")
print(secret)`,
  },
];
export const dummyNoteItems = [
  {
    id: "uuid4()",
    title: "Web Assembly programming",
    tags: ["web development", "react"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Web Server programming",
    tags: ["web console", "SRS"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "SSR"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: "uuid4()",
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
];
