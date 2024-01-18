import axios from 'axios'

/**
 * Retrieves the HTML source code of a given URL.
 *
 * @param {string} url - The URL of the webpage to retrieve the HTML source code from.
 * @return {Promise<string>} A promise that resolves to the HTML source code of the webpage.
 */
export async function getHtmlSource(url: string): Promise<string> {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching HTML source:')
    throw error
  }
}
