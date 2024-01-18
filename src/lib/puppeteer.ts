import puppeteer from 'puppeteer'

/**
 * Retrieves the HTML source code of a given URL.
 *
 * @param {string} url - The URL of the webpage to retrieve the HTML source code from.
 * @return {Promise<string>} A promise that resolves to the HTML source code of the webpage.
 */
export async function getHtmlSource(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0' })
    const htmlSource = await page.content()
    return htmlSource
  } finally {
    await browser.close()
  }
}
