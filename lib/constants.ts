export const localStorageKey = "secret-share";

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

export const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is SecretShare?",
        answer:
          "SecretShare is a secure platform for sharing sensitive information like environment variables, API keys, and credentials with your team or clients. It uses end-to-end encryption to ensure your data remains private and secure.",
      },
      {
        question: "How does SecretShare work?",
        answer:
          "SecretShare encrypts your sensitive information in your browser before it's sent to our servers. When you share a secret, we generate a secure link that you can send to others. Only those with the link can decrypt and access the information. You can also set expiration conditions based on time or number of views.",
      },
      {
        question: "Is SecretShare free to use?",
        answer:
          "Yes! We offer a free plan that allows you to share up to 5 secrets with a 7-day expiration. For more features and longer expiration times, check out our Pro and Enterprise plans.",
      },
    ],
  },
  {
    category: "Security",
    questions: [
      {
        question: "How secure is SecretShare?",
        answer:
          "SecretShare uses end-to-end encryption, meaning your secrets are encrypted in your browser before being sent to our servers. We never have access to your unencrypted data. We use industry-standard AES-256 encryption to ensure your data remains secure.",
      },
      {
        question: "Can SecretShare employees access my secrets?",
        answer:
          "No. We use a zero-knowledge architecture, which means your secrets are encrypted in your browser before they reach our servers. We never have access to the encryption keys or the unencrypted content of your secrets.",
      },
      {
        question: "What happens to my secrets after they expire?",
        answer:
          "Once a secret expires (either by reaching its time limit or maximum number of views), it is permanently deleted from our servers. There is no way to recover an expired secret.",
      },
    ],
  },
  {
    category: "Features",
    questions: [
      {
        question: "How do expiring secrets work?",
        answer:
          "You can set your secrets to expire after a specific time period (e.g., 1 hour, 24 hours, 7 days) or after a certain number of views. Once the expiration condition is met, the secret is permanently deleted from our servers and can no longer be accessed.",
      },
      {
        question: "Can I restrict who can access my secrets?",
        answer:
          "Yes, with our Pro and Enterprise plans, you can restrict access to specific email addresses. Only users with those email addresses will be able to view the secret. You can also receive notifications when someone accesses your secret.",
      },
      {
        question: "Can I edit a secret after I've created it?",
        answer:
          "Yes, you can edit the content, name, and expiration settings of your secrets at any time before they expire. However, if someone has already accessed the secret using a shared link, they won't see the updated version unless you share a new link with them.",
      },
    ],
  },
  {
    category: "Account & Billing",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "You can sign up for a SecretShare account using your email address, or by signing in with Google or GitHub. Once you've created an account, you can start sharing secrets right away.",
      },
      {
        question: "Can I switch between plans?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. When you downgrade, the new price will take effect at the start of your next billing cycle.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with SecretShare within the first 14 days, contact our support team for a full refund.",
      },
    ],
  },
  {
    category: "Troubleshooting",
    questions: [
      {
        question: "What should I do if a shared link isn't working?",
        answer:
          "If a shared link isn't working, it may have expired or reached its maximum number of views. You can check the status of your shared secrets in your dashboard. If you believe there's an issue, please contact our support team.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer:
          "You can reset your password by clicking the 'Forgot password?' link on the login page. We'll send you an email with instructions to reset your password.",
      },
      {
        question: "How do I contact support?",
        answer:
          "You can contact our support team by emailing secretshare-support@gmail.com or by visiting our Support page. We aim to respond to all inquiries within 24 hours.",
      },
    ],
  },
];
