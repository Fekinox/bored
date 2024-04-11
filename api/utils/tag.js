
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";

// Gets the tag from the database if it exists, but if it doesn't it creates
// the new tag and returns it.
export async function getTag(tag, {
    mustExist = false,
    notInNamespaces = [],
    inNamespaces = null,
} = {}) {
    let name
    let namespace = undefined

    let tokens = tag.split(":")
    switch(tokens.length) {
    case 1:
        name = tokens[0]
        break;
    case 2:
        name = tokens[1]
        namespace = tokens[0]
        break;
    default:
        throw new Error("invalid format for tag")
    }

    if (notInNamespaces.find((n) => n === namespace) !== undefined) {
        throw new Error("tag is in excluded namespaces")
    }

    if (inNamespaces !== null && inNamespaces.find((n) => n === namespace) === undefined) {
        throw new Error("tag is not in needed namespaces")
    }

    let query = {
        name: name,
        namespace: namespace || "none"
    }

    let theTag = await Tag.findOne(query)
    if (!theTag && mustExist) {
        throw new Error(`tag ${name} (${namespace}) must exist`)
    } else if (!theTag) {
        let newTag = new Tag(query)
        await newTag.save()
        return newTag
    }
    return theTag
}

export async function getAllTags(tagList) {
    const splitTags = tagList.split(",")
    return Promise.all(
        splitTags.map((tag) => {
            return getTag(tag.trim())
        })
    )
}

const tagQueryRegex = /\s*(-)?((\w+:)?\w+)\s*/g

export async function parseTagQuery(query) {
    const matches = [...query.matchAll(tagQueryRegex)]

    const results = await Promise.all(
        matches.map(async (m) => {
            const tag = await getTag(m[2], {
                mustExist: true,
            })

            return {
                id: tag._id,
                negative: !!m[1],
            }
        })
    )

    let pos = []
    let neg = []

    for (const r of results) {
        if (r.negative) {
            neg.push({ tags: r.id })
        } else {
            pos.push({ tags: r.id })
        }
    }

    let q = {}
    if (pos.length > 0) { q.$and = pos }
    if (neg.length > 0) { q.$nor = neg }

    return q
}
