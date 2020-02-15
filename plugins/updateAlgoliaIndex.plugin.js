
const { registerPlugin } = require("@scullyio/scully")
const { log, logWarn, orange, green, red, logError } = require("@scullyio/scully/utils/log")
const algoliasearch = require("algoliasearch")


const SETTINGS = { attributesToSnippet: [`excerpt: 20`] }

const INDEX_NAME = `Blog_Posts`


/**
 *
 * @param html
 * @param options {
 * route: string;
 * data: {
 *   title: string;
 *   date: string;
 *   description: string;
 *   tags: string[];
 *   publish: true;
 *   image: string;
 *   sourceFile: string
 * }}
 * @returns {Promise<string>}
 */
const updateAlgoliaIndex = async (html, options) => {
  if (process.env.DO_SEARCH_INDEX === 'false' || process.env.DO_SEARCH_INDEX === 'FALSE') {
    logWarn(orange("Not performing index, set DO_SEARCH_INDEX environment variable to TRUE"))
    return html
  }

  try {
    const client = initAlgoliaClient()
    const payload = buildPayload(options)

    const index = client.initIndex(INDEX_NAME)
    const mainIndexExists = await indexExists(index)
    const indexToUse = index

    log(`Using [${indexToUse.indexName}]`)

    // if (mainIndexExists) {
    //   log(`copying existing index`)
    //   await scopedCopyIndex(client, index, tmpIndex)
    // }

    const { taskID } = await indexToUse.saveObject(payload)
    await indexToUse.waitTask(taskID)

    if (SETTINGS) {
      const { taskID } = await indexToUse.setSettings(SETTINGS)
      await indexToUse.waitTask(taskID)
    }
    //
    // if (mainIndexExists) {
    //   log(`moving copied index to main index`)
    //   await moveIndex(client, tmpIndex, index)
    // }

    log(green(`Updated index for [${payload.title}]`))
  } catch (e) {
    // shit broke
    logError(JSON.stringify(e))
  }

  return html
}

function initAlgoliaClient() {
  let isError = false
  const appId = process.env.ALGOLIA_APP_ID
  const apiKey = process.env.ALGOLIA_ADMIN_KEY
  if (!appId) {
    logError(red(`ALGOLIA_APP_ID not found in environment variables!`))
    isError = true
  }
  if (!apiKey) {
    logError(red(`ALGOLIA_ADMIN_KEY not found in environment variables!`))
    isError = true
  }
  if (isError) {
    throw "Make sure environment variables are set"
  }

  return algoliasearch(appId, apiKey)
}

/**
 *
 * @param options
 * @returns {{date: *, path: *, description: *, title: *, objectID: number, tags: *[]}}
 */
function buildPayload(options) {
  const crypto = require("crypto")
  const hash = crypto.createHash("sha256")
  const { data, route } = options
  hash.update(data.title, "utf8")
  return {
    title: data.title,
    description: data.description,
    tags: [...data.tags],
    path: route,
    date: data.date,
    objectID: parseInt(hash.digest("hex").slice(0, 15), 16),
    createIfNotExists: true,
  }
}


/**
 * Does an Algolia index exist already
 *
 * @param index
 */
async function indexExists(index) {
  try {
    const { nbHits } = await index.search()
    return nbHits > 0
  } catch (e) {
    return false
  }
}


/**
 * Copy the settings, synonyms, and rules of the source index to the target index
 * @param client
 * @param sourceIndex
 * @param targetIndex
 * @return {Promise}
 */
async function scopedCopyIndex(client, sourceIndex, targetIndex) {
  const { taskID } = await client.copyIndex(
    sourceIndex.indexName,
    targetIndex.indexName,
    {
      scope: ["settings", "synonyms", "rules"],
    },
  )
  return targetIndex.waitTask(taskID)
}


/**
 * moves the source index to the target index
 * @param client
 * @param sourceIndex
 * @param targetIndex
 * @return {Promise}
 */
async function moveIndex(client, sourceIndex, targetIndex) {
  const { taskID } = await client.moveIndex(
    sourceIndex.indexName,
    targetIndex.indexName,
  )
  return targetIndex.waitTask(taskID)
}

const validator = async conf => []
registerPlugin("render", "updateAlgoliaIndex", updateAlgoliaIndex, validator)

module.exports.updateAlgoliaIndex = updateAlgoliaIndex
