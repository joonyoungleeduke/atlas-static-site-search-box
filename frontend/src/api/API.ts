import * as Realm from 'realm-web'
import { SearchResult } from '../types'

export class API {
  private app: Realm.App
  private user: Realm.User | null = null

  private constructor(id: string) {
    this.app = new Realm.App({ id })
  }

  // eslint-disable-next-line camelcase
  public static async init(app_id: string): Promise<API> {
    const api = new API(app_id)
    await api.logInUser()
    return api
  }

  public async searchDocs(query: string): Promise<SearchResult> {
    if (query === '') {
      console.warn('Tried to search with an empty string')
      return {
        results: [],
        completions: []
      }
    }
    return (await this.user?.functions.searchPageContents({
      query
    })) as SearchResult
  }

  private async logInUser() {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous()

    // Authenticate the user
    this.user = await this.app.logIn(credentials)
  }
}
