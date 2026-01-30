export function sanitizeHTML(html: string): string {
  // Basic HTML sanitization - only allow specific safe tags
  const allowedTags = [
    'p', 'h2', 'h3', 'h4', 'strong', 'em', 'ul', 'ol', 'li', 'br',
  ];

  // Remove any script tags and potentially harmful content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, ''); // Remove event handlers
  sanitized = sanitized.replace(/javascript:/gi, ''); // Remove javascript: urls

  return sanitized;
}

export function formatContentForDisplay(content: string): string {
  if (!content) return '';

  // Sanitize the HTML first
  const sanitized = sanitizeHTML(content);

  // Ensure proper spacing and formatting
  let formatted = sanitized
    .replace(/<\/p>\s*<p>/g, '</p>\n\n<p>')
    .replace(/<\/h2>\s*<p>/g, '</h2>\n\n<p>')
    .replace(/<\/h3>\s*<p>/g, '</h3>\n\n<p>')
    .replace(/<\/ul>\s*<p>/g, '</ul>\n\n<p>')
    .replace(/<\/ol>\s*<p>/g, '</ol>\n\n<p>');

  return formatted.trim();
}

export function extractFirstParagraph(htmlContent: string): string {
  if (!htmlContent) return '';

  // Extract first paragraph or first 200 characters
  const pMatch = htmlContent.match(/<p>(.*?)<\/p>/);
  if (pMatch && pMatch[1]) {
    const text = pMatch[1].replace(/<[^>]*>/g, '');
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  }

  // Fallback: just take first 200 characters
  const text = htmlContent.replace(/<[^>]*>/g, '');
  return text.length > 200 ? text.substring(0, 200) + '...' : text;
}
