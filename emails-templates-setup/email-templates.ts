const verificationEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SecretShare Email Verification</title>
  <style>
    /* Base colors from reference template */
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 20px 0;
      background-color: var(--bg-dark); /* Ensure wrapper also has body background */
    }

    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark); /* Matched to reference, distinct from card */
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark); /* Added for separation */
    }

    .header img {
      width: 48px; /* From reference */
      height: auto;
      display: block; /* For centering */
      margin: 0 auto; /* For centering */
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .content h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .content a { /* For general links in content */
      color: var(--text-dark); /* Brighter than subtext for clarity */
      text-decoration: underline;
    }
    .content a:hover {
      color: var(--subtext-dark);
    }

    .verification-code {
      margin: 0 auto 20px auto;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      color: var(--text-dark);
      background-color: var(--bg-dark); /* Slightly different from card for emphasis */
      border: 1px solid var(--border-dark);
      border-radius: 6px;
      max-width: 280px;
      text-align: center;
    }

    .btn-primary {
      display: inline-block;
      margin: 0 8px 16px; /* Default margin, can be adjusted if it's the sole button */
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-light);
      color: var(--btn-text-light);
      text-decoration: none;
      border: 2px solid var(--btn-border-light);
      border-radius: 6px;
    }

    .btn-primary:hover {
        background-color: #e0e0e0; /* Slight hover effect for light button */
        border-color: #e0e0e0;
    }

    .footer {
      background-color: var(--card-dark); /* Matches container background */
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
      border-top: 1px solid var(--border-dark); /* Added for separation */
    }

    .footer p {
        margin-bottom: 10px; /* Spacing for footer paragraphs */
        font-size: 12px; /* Explicitly set from reference footer style */
        color: var(--subtext-dark); /* Explicitly set */
    }
    .footer p:last-child {
        margin-bottom: 0;
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 4px; /* Adjusted slightly for better spacing */
    }
    .footer a:hover {
        text-decoration: underline;
    }

    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        border-radius: 0; /* Full width on mobile often looks better without border radius */
      }
      .content {
        padding: 24px 16px;
      }
      .content h1 {
        font-size: 22px !important;
      }
      .content p, .footer, .btn-primary {
        font-size: 14px !important;
      }
      .btn-primary {
        padding: 12px 20px !important;
        margin-left: 0;
        margin-right: 0;
        display: block; /* Make buttons full width on mobile for easier tapping */
      }
      .verification-code {
        font-size: 20px !important;
      }
    }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;color:#0d0d0d;font-size:1px;line-height:1px;">
    Your verification code is valid for 24 hours. Confirm now to unlock all SecretShare features!
  </div>
  <div class="wrapper">
    <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
      <tr>
        <td class="header">
          <img src="cid:unique_inline_logo_cid" alt="SecretShare Logo">
          <h2>SecretShare</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h1>Verify Your Email</h1>
          <p>Hi [user_name],<br>
            Thank you for signing up with SecretShare. Please verify your email to activate your account and enjoy full access to all features.
          </p>
          <div class="verification-code">
            [verification_code]
          </div>
          <p style="font-size: 14px; color: var(--subtext-dark); margin-bottom: 8px;">This code will expire in 24 hours.</p>
          <p style="font-size: 14px; color: var(--subtext-dark); margin-bottom: 25px;">Verifying now unlocks all SecretShare features instantly.</p>
          <a href="[verification_link]" class="btn-primary">Verify Email</a>
          <p style="font-size: 14px; line-height: 1.4; color: var(--subtext-dark); margin-top: 20px; margin-bottom: 0;">
            If you didn’t request this, you can safely ignore this email or <a href="mailto:support@secretshare.io">contact support</a>.
          </p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>SecretShare Inc., Tic Hub-Polytechnique, Tech City, Country</p>
          <p>
            <a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:support@secretshare.io">Support</a>
          </p>
          <p>© 2025 SecretShare Inc. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`;

const welcomeEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SecretShare Welcome Email</title>
  <style>
    /* Base colors */
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 20px 0;
    }

    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark);
      padding: 24px;
      text-align: center;
    }

    .header img {
      width: 48px;
      height: auto;
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .header p {
      margin: 0;
      font-size: 14px;
      color: var(--subtext-dark);
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .content h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .btn-primary {
      display: inline-block;
      margin: 0 8px 16px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-light);
      color: var(--btn-text-light);
      text-decoration: none;
      border: 2px solid var(--btn-border-light);
      border-radius: 6px;
    }

    .btn-secondary {
      display: inline-block;
      margin: 0 8px 16px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-outline);
      color: var(--text-dark);
      text-decoration: none;
      border: 2px solid var(--btn-border-outline);
      border-radius: 6px;
    }

    .footer {
      background-color: var(--card-dark);
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 8px;
    }

    @media only screen and (max-width: 620px) {
      .content {
        padding: 24px 16px;
      }
      .content h1 {
        font-size: 22px !important;
      }
      .content p, .footer, .btn-primary, .btn-secondary {
        font-size: 14px !important;
      }
      .btn-primary, .btn-secondary {
        padding: 12px 20px !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="container" role="presentation" cellspacing="0" cellpadding="0">
      <tr>
        <td class="header">
          <img src="https://yourcdn.com/logo-white.png" alt="SecretShare Logo">
          <h2>SecretShare</h2>
          <p>Secure. Private. Encrypted.</p>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h1>Welcome to SecretShare!</h1>
          <p>Hi [user_name],<br> We’re thrilled you’ve joined the SecretShare community. Ready to organize, capture, and share your ideas? Let’s get you started.</p>
          <a href="[homepage_link]" class="btn-primary">Get Started</a>
          <a href="[learn_link]" class="btn-secondary">How It Works</a>
          <p>Have questions? <a href="mailto:support@secretshare.io">Contact Support</a></p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>SecretShare Inc., Tic Hub-Polytechnique, Tech City, Country</p>
          <p><a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:support@secretshare.io">Support</a></p>
          <p>© 2025 SecretShare Inc. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`;

const passwordResetEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    /* Base colors from reference template */
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 20px 0;
      background-color: var(--bg-dark);
    }

    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark);
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
    }

    .header img {
      width: 48px;
      height: auto;
      display: block;
      margin: 0 auto;
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .content h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .content a { /* For general links in content */
      color: var(--text-dark);
      text-decoration: underline;
    }
    .content a:hover {
      color: var(--subtext-dark);
    }
    
    .content .fallback-link { /* Specific style for the fallback URL link */
        color: var(--text-dark);
        text-decoration: underline;
        word-break: break-all; /* Ensures long URLs don't break layout */
    }
    .content .fallback-link:hover {
        color: var(--subtext-dark);
    }


    .btn-primary {
      display: inline-block;
      margin: 0 8px 16px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-light);
      color: var(--btn-text-light);
      text-decoration: none;
      border: 2px solid var(--btn-border-light);
      border-radius: 6px;
    }
    .btn-primary:hover {
        background-color: #e0e0e0;
        border-color: #e0e0e0;
    }

    .btn-secondary { /* Kept for consistency, though not used here */
      display: inline-block;
      margin: 0 8px 16px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-outline);
      color: var(--text-dark);
      text-decoration: none;
      border: 2px solid var(--btn-border-outline);
      border-radius: 6px;
    }
    .btn-secondary:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .footer {
      background-color: var(--card-dark);
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
      border-top: 1px solid var(--border-dark);
    }

    .footer p {
        margin-bottom: 10px;
        font-size: 12px;
        color: var(--subtext-dark);
    }
    .footer p:last-child {
        margin-bottom: 0;
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 4px;
    }
    .footer a:hover {
        text-decoration: underline;
    }

    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        border-radius: 0;
      }
      .content {
        padding: 24px 16px;
      }
      .content h1 {
        font-size: 22px !important;
      }
      .content p, .footer, .btn-primary, .btn-secondary {
        font-size: 14px !important;
      }
      .btn-primary, .btn-secondary {
        padding: 12px 20px !important;
        margin-left: 0;
        margin-right: 0;
        display: block;
      }
    }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;color:#0d0d0d;font-size:1px;line-height:1px;">
    Your password reset link is valid for 24 hours. If not requested by you, ignore this email.
  </div>
  <div class="wrapper">
    <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
      <tr>
        <td class="header">
          <img src="cid:unique_inline_logo_cid" alt="SecretShare Logo">
          <h2>SecretShare</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h1>Password Reset Request</h1>
          <p>Hi [user_name],<br>
            We received a request to reset your password. Click the button below to securely update your credentials.
          </p>
          <a href="[reset_link]" class="btn-primary">Reset Password</a>
          <p style="font-size: 14px; color: var(--subtext-dark); margin-top: 20px; margin-bottom: 10px;">
            This link will expire in 24 hours for your security.
          </p>
          <p style="font-size: 14px; color: var(--subtext-dark); margin-bottom: 20px;">
            If the button doesn’t work, copy and paste the following URL into your browser:<br>
            <a href="[reset_link]" class="fallback-link">[reset_link]</a>
          </p>
          <p style="font-size: 14px; line-height: 1.4; color: var(--subtext-dark); margin-bottom: 0;">
            If you did not request a password reset, you can safely ignore this email or <a href="mailto:flyinnsafuh@gmail.com">contact support</a>.
          </p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>SecretShare Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
          <p>
            <a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com">Support</a>
          </p>
          <p>© 2025 SecretShare Inc. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`;

const accountDeleteEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deleted</title>
  <style>
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
      --danger-text: #d9534f;
      --btn-bg-danger: #d9534f;
      --btn-text-danger: #ffffff;
      --btn-border-danger: #d9534f;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 20px 0;
      background-color: var(--bg-dark);
    }

    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark);
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
    }

    .header img {
      width: 48px;
      height: auto;
      display: block;
      margin: 0 auto;
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .content h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--danger-text);
    }

    .content p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .footer {
      background-color: var(--card-dark);
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
      border-top: 1px solid var(--border-dark);
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 4px;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        border-radius: 0;
      }
      .content {
        padding: 24px 16px;
      }
      .content h1 {
        font-size: 22px !important;
      }
      .content p, .footer {
        font-size: 14px !important;
      }
    }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;color:#0d0d0d;font-size:1px;line-height:1px;">
    Your SecretShare account has been successfully deleted.
  </div>
  <div class="wrapper">
    <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
      <tr>
        <td class="header">
          <img src="cid:unique_inline_logo_cid" alt="SecretShare Logo">
          <h2>SecretShare</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h1>Account Deleted</h1>
          <p>Hi [user_name],</p>
          <p>Your SecretShare account has been permanently deleted. All associated data has been removed from our systems and cannot be recovered.</p>
          <p>We're sorry to see you go. If you ever decide to return, you're always welcome back!</p>
          <p>If you have any questions or concerns, feel free to reach out to our support team at <a href="mailto:flyinnsafuh@gmail.com">flyinnsafuh@gmail.com</a>.</p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>SecretShare Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
          <p>
            <a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com">Support</a>
          </p>
          <p>© 2025 SecretShare Inc. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`;

const accountLogoutEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Logout Notification</title>
  <style>
    /* Base colors from reference template */
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 20px 0;
      background-color: var(--bg-dark);
    }

    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark);
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
    }

    .header img {
      width: 48px;
      height: auto;
      display: block;
      margin: 0 auto;
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .content h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .content a {
      color: var(--text-dark);
      text-decoration: underline;
    }

    .content a:hover {
      color: var(--subtext-dark);
    }

    .verification-code {
      margin: 0 auto 20px auto;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      color: var(--text-dark);
      background-color: var(--bg-dark);
      border: 1px solid var(--border-dark);
      border-radius: 6px;
      max-width: 280px;
      text-align: center;
    }

    .btn-primary {
      display: inline-block;
      margin: 0 8px 16px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-light);
      color: var(--btn-text-light);
      text-decoration: none;
      border: 2px solid var(--btn-border-light);
      border-radius: 6px;
    }

    .btn-primary:hover {
      background-color: #e0e0e0;
      border-color: #e0e0e0;
    }

    .footer {
      background-color: var(--card-dark);
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
      border-top: 1px solid var(--border-dark);
    }

    .footer p {
      margin-bottom: 10px;
      font-size: 12px;
      color: var(--subtext-dark);
    }

    .footer p:last-child {
      margin-bottom: 0;
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 4px;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        border-radius: 0;
      }
      .content {
        padding: 24px 16px;
      }
      .content h1 {
        font-size: 22px !important;
      }
      .content p, .footer, .btn-primary {
        font-size: 14px !important;
      }
      .btn-primary {
        padding: 12px 20px !important;
        margin-left: 0;
        margin-right: 0;
        display: block;
      }
      .verification-code {
        font-size: 20px !important;
      }
    }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;color:#0d0d0d;font-size:1px;line-height:1px;">
    You’ve been logged out from all devices. Secure your account if this wasn’t you.
  </div>
  <div class="wrapper">
    <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
      <tr>
        <td class="header">
          <img src="cid:unique_inline_logo_cid" alt="SecretShare Logo">
          <h2>SecretShare</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h1>Logout Successful</h1>
          <p>Hi [user_name],<br>
            You’ve been securely logged out from all devices. If this was you, you’re all set.
          </p>
          <p>If you did not initiate this logout, please secure your account immediately.</p>
          <a href="[account_security_link]" class="btn-primary">Secure Your Account</a>
          <p style="font-size: 14px; color: var(--subtext-dark); margin-top: 20px; margin-bottom: 0;">
            If the button above doesn’t work, copy and paste this link into your browser:<br>
            <a href="[account_security_link]" style="color: var(--text-dark); text-decoration: none; word-break: break-all;">[account_security_link]</a>
          </p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>SecretShare Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
          <p>
            <a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com">Support</a>
          </p>
          <p>© 2025 SecretShare Inc. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`;

const accountNotificationTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activity Notification</title>
  <style>
    /* Base colors from reference template */
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 20px 0;
      background-color: var(--bg-dark);
    }

    .container {
      width: 600px;
      max-width: 100%;
      margin: 0 auto;
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark);
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
    }

    .header img {
      width: 48px;
      height: auto;
      display: block;
      margin: 0 auto;
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content {
      padding: 40px 30px;
      text-align: center;
    }

    .content h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .content a {
      color: var(--text-dark);
      text-decoration: underline;
    }

    .content a:hover {
      color: var(--subtext-dark);
    }

    .verification-code {
      margin: 0 auto 20px auto;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      color: var(--text-dark);
      background-color: var(--bg-dark);
      border: 1px solid var(--border-dark);
      border-radius: 6px;
      max-width: 280px;
      text-align: center;
    }

    .btn-primary {
      display: inline-block;
      margin: 0 8px 16px;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--btn-bg-light);
      color: var(--btn-text-light);
      text-decoration: none;
      border: 2px solid var(--btn-border-light);
      border-radius: 6px;
    }

    .btn-primary:hover {
      background-color: #e0e0e0;
      border-color: #e0e0e0;
    }

    .footer {
      background-color: var(--card-dark);
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
      border-top: 1px solid var(--border-dark);
    }

    .footer p {
      margin-bottom: 10px;
      font-size: 12px;
      color: var(--subtext-dark);
    }

    .footer p:last-child {
      margin-bottom: 0;
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 4px;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 620px) {
      .container {
        width: 100% !important;
        border-radius: 0;
      }
      .content {
        padding: 24px 16px;
      }
      .content h1 {
        font-size: 22px !important;
      }
      .content p, .footer, .btn-primary {
        font-size: 14px !important;
      }
      .btn-primary {
        padding: 12px 20px !important;
        margin-left: 0;
        margin-right: 0;
        display: block;
      }
      .verification-code {
        font-size: 20px !important;
      }
    }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;color:#0d0d0d;font-size:1px;line-height:1px;">
    Recent activity detected—review now to ensure your account’s security.
  </div>
  <div class="wrapper">
    <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
      <tr>
        <td class="header">
          <img src="cid:unique_inline_logo_cid" alt="SecretShare Logo">
          <h2>SecretShare</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <h1>Account Activity Notification</h1>
          <p>Hi [user_name],<br>
            We detected the following activity on your account. If this was you, you’re all set. Otherwise, please take action to secure your account.
          </p>
          <p><strong>Activity:</strong> [activity_description]</p>
          <p><strong>Time:</strong> [activity_time]</p>
          <p><strong>Source:</strong> [activity_author]</p>

          <a href=[account_security_link] class="btn-primary">Review Activity</a>

          <p style="font-size: 14px; color: var(--subtext-dark); margin-top: 10px; margin-bottom: 0;">
            If the button above doesn’t work, copy and paste this link into your browser:<br>
            <a href=[account_security_link] style="color: var(--text-dark); text-decoration: none; word-break: break-all;">[account_security_link]</a>
          </p>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p>SecretShare Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
          <p>
            <a href="[unsubscribe_link]">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com">Support</a>
          </p>
          <p>© 2025 SecretShare Inc. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>

`;
const adminNotificationTemplateForAccountDelete = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Activity Notification</title>
  <style>
    @media only screen and (max-width: 620px) {
      table[class="main-wrapper"] {
        width: 100% !important;
      }
      td[class="content-padding"] {
        padding: 20px !important;
      }
      h1 {
        font-size: 20px !important;
      }
      h2 {
        font-size: 22px !important;
      }
      p, td {
        font-size: 14px !important;
      }
    }

    /* Base colors from reference template */
    :root {
      --bg-dark: #0d0d0d;
      --text-dark: #ffffff;
      --subtext-dark: #bbbbbb;
      --card-dark: #1a1a1a;
      --border-dark: #2a2a2a;
      --btn-bg-light: #ffffff;
      --btn-text-light: #0d0d0d;
      --btn-border-light: #ffffff;
      --btn-bg-outline: transparent;
      --btn-border-outline: #ffffff;
    }

    /* Default Light Theme */
    body {
      background-color: var(--bg-dark);
      color: var(--text-dark);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    .main-wrapper {
      background-color: var(--card-dark);
      border: 1px solid var(--border-dark);
      width: 600px;
      margin: 0 auto;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: var(--bg-dark);
      padding: 24px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
    }

    .header img {
      width: 48px;
      height: auto;
      display: block;
      margin: 0 auto;
    }

    .header h2 {
      margin: 12px 0 4px;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content-padding {
      padding: 30px;
      text-align: center;
    }

    .content-padding h1 {
      margin: 0 0 16px;
      font-size: 26px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .content-padding p {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.5;
      color: var(--subtext-dark);
    }

    .content-padding a {
      color: var(--text-dark);
      text-decoration: underline;
    }

    .content-padding a:hover {
      color: var(--subtext-dark);
    }

    .footer {
      background-color: var(--card-dark);
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: var(--subtext-dark);
      border-top: 1px solid var(--border-dark);
    }

    .footer p {
      margin-bottom: 10px;
      font-size: 12px;
      color: var(--subtext-dark);
    }

    .footer p:last-child {
      margin-bottom: 0;
    }

    .footer a {
      color: var(--subtext-dark);
      text-decoration: none;
      margin: 0 4px;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 620px) {
      .main-wrapper {
        width: 100% !important;
        border-radius: 0;
      }
      .content-padding {
        padding: 24px 16px;
      }
      .content-padding h1 {
        font-size: 22px !important;
      }
      .content-padding p, .footer, .btn-primary {
        font-size: 14px !important;
      }
      .footer {
        font-size: 14px !important;
      }
    }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f7fc;font-size:1px;line-height:1px;">
    Recent activity detected—review details below to keep your SecretShare account secure.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" class="main-wrapper">
          <!-- Header -->
          <tr>
            <td align="center" class="header" style="padding:20px;">
              <img src="cid:unique_inline_logo_cid" alt="SecretShare Logo" width="120" style="display:block;margin:0 auto;">
              <h2 style="margin:10px 0 0;font-size:24px;color:var(--text-dark);font-weight:bold;">SecretShare</h2>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="content-padding" style="padding:30px;text-align:center;">
              <h1 style="margin:0 0 10px;font-size:22px;color:var(--text-dark);font-weight:600;">Account Activity Notification</h1>
              <p style="font-size:16px;line-height:1.5;margin:0 0 20px;color:var(--subtext-dark);">
                Hi [user_name],<br>
                We detected a recent account deletion—see details below. If this wasn’t you, please review immediately.
              </p>
              <!-- Activity Details -->
              <table role="presentation" cellspacing="0" cellpadding="5" style="margin:0 auto 40px ;text-align:left;color:var(--subtext-dark);">
                <tr><td><strong>Activity:</strong></td><td>[activity_description]</td></tr>
                <tr><td><strong>Reason:</strong></td><td>[account_delete_reason]</td></tr>
                <tr><td><strong>Time:</strong></td><td>[activity_time]</td></tr>
                <tr><td><strong>Initiated By:</strong></td><td>[activity_author]</td></tr>
              </table>
              <a href="[account_security_link]" style="background-color:var(--btn-bg-light);border:2px solid var(--btn-border-light);color:var(--btn-text-light);padding:14px 28px;font-size:16px;font-weight:600;text-decoration:none;border-radius:6px;margin-top:1rem;">Secure Your Account</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer" style="padding:20px;text-align:center;font-size:12px;">
              <p style="margin:0 0 5px;color:var(--subtext-dark);">SecretShare Inc., Tic Hub-Polytechnique, Yaounde, Cameroon</p>
              <p style="margin:0 0 10px;">
                <a href="[unsubscribe_link]" style="text-decoration:none;color:var(--subtext-dark);">Unsubscribe</a> | <a href="mailto:flyinnsafuh@gmail.com" style="text-decoration:none;color:var(--subtext-dark);">Support</a>
              </p>
              <p style="margin:0;font-size:10px;color:#999999;">© 2025 SecretShare Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>


`;

export {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  accountDeleteEmailTemplate,
  accountLogoutEmailTemplate,
  passwordResetEmailTemplate,
  accountNotificationTemplate,
  adminNotificationTemplateForAccountDelete,
};
