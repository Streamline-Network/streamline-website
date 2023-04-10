import { Checks } from '../blocks/block-types'
import { Database } from 'pages/api/db/database'
import { MembersData } from 'pages/api/discord/members'
import { SetNicknameData } from 'pages/api/discord/set-nickname'
import customFetch from 'utils/fetch'

export const CRITICAL_ERROR_MESSAGE =
  'Oh no! A critical error has occurred. Check your network connection.'

const checks: Checks = [
  async formInfo => {
    const age = parseInt(formInfo['How old are you?'])

    if (isNaN(age) || age < 13) return 'Invalid age or age in under our minimum age (13)!'

    return undefined
  },
  async () => {
    // Check with the Discord Bot to see if the person applying is in the Discord server.
    try {
      const { data } = await customFetch<MembersData>('/api/discord/members')
      const { data: idData } = await customFetch<Database.UserIds>(
        '/api/db/docs?path=userIds/{email}'
      )

      if ('error' in data) return 'A critical error occurred.'

      if ((data.members as string[]).includes(idData.providerAccountId)) {
        return undefined
      }

      return 'You must join the Streamline SMP Discord to apply!'
    } catch (error) {
      return CRITICAL_ERROR_MESSAGE + ' JOINED_CHECK'
    }
  },
  async formInfo => {
    // Set nickname on Discord to Minecraft name.
    const regex = /\((.*?)\)/

    async function formatAndSetNickname(username: string, nickname: string) {
      const finalNickname = nickname ? `${username} (${nickname.trim()})` : username

      const { response } = await customFetch<undefined, SetNicknameData>(
        '/api/discord/set-nickname',
        'POST',
        { nickname: finalNickname }
      )

      if (!response.ok) {
        return 'Unexpected error occurred. SET_NICK'
      } else return undefined
    }

    try {
      // Check if nickname with Minecraft name is too long.
      const MAX_DISCORD_NICKNAME_LENGTH = 32

      const nickname = formInfo['Do you have a nickname you want to be called?'].trim()

      if (!nickname) return undefined

      if (regex.test(nickname)) return 'Nickname cannot have parentheses.'

      const username = formInfo['What is your Minecraft Java Edition username?'].trim()

      if (nickname.length + username.length + 3 > MAX_DISCORD_NICKNAME_LENGTH) {
        return 'Nickname is too long!'
      } else {
        // Set the nickname on Discord.
        return formatAndSetNickname(username, nickname)
      }
    } catch (error) {
      return CRITICAL_ERROR_MESSAGE + ' NICKNAME_CHECK'
    }
  },
]

export default checks
