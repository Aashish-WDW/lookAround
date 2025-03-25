import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { tourUrl } = req.query;

  if (!tourUrl) {
    return res.status(400).json({ error: 'Tour URL is required' });
  }

  try {
    // Fetch the tour page HTML
    const response = await axios.get(tourUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // Comprehensive removal of Vapor design system elements and share icons
    $(`
      .vapor-button,
      .vapor-button-text-vertical,
      .vapor-button-text-vertical-icon,
      .vapor-button-text-vertical-content,
      .vapor-button-text-vertical-underline,
      .vapor-icon,
      .vapor-text-warp,
      .vapor-text,
      [class*="vapor-"],
      [role="img"],
      svg[aria-label="Share"],
      button[type="button"]:has(svg[aria-label="Share"]),
      .share-button,
      .share-icon,
      [data-share],
      [data-action="share"]
    `).remove();

    // Remove inline SVG elements related to sharing
    $('svg').filter((i, el) => {
      const $el = $(el);
      return $el.attr('aria-label') === 'Share' || 
             $el.find('path').attr('fill')?.includes('rgba(177, 149, 255, 1)');
    }).remove();

    // Additional cleanup to remove any remaining share-related attributes
    $('[aria-label="Share"]').remove();
    $('[class*="share"]').remove();

    // Send the modified HTML
    res.setHeader('Content-Type', 'text/html');
    res.send($.html());
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch tour', details: error.message });
  }
}