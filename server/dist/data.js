// Simple in-memory store for dev server (no Mongo required)
const { v4: uuidv4 } = require("uuid")

const users = []
const jobInfos = []
const interviews = []

module.exports = {
  users,
  jobInfos,
  interviews,
  uuidv4,
}
