import { env } from '@/env'
import axios, { AxiosResponse } from 'axios'

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

interface SendEmailResponse extends AxiosResponse {
  status: number
  data: {
    success: boolean
    message: string
  }

}
export async function sendEmailToUser(email: string, accessCode: string): Promise<SendEmailResponse> {
  try {
    const response = await axios.post(env.HERMODR_URL, {
      mailto: email,
      accessCode,
    })

    return response
  } catch (error) {
    console.error('Error requesting access code:')
    throw error
  }
}