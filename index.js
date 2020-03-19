require('./src/ProtoTypes').start()

const Client = require('./src/ChinoClient')
const { TOKEN } = process.env;
const ShardManager = require('./src/ShardManager')
const config = require('./config')
const client = new Client({
	fetchAllMembers: true,
	disableEveryone: true
})

if (client.shard) client.shardManager = new ShardManager(client)

client.loadCommands('./src/commands')
client.loadEvents('./src/events')
client.login(TOKEN)
	.then(() => console.log(`${client.shard ? ('Shard ' + client.shard.ids) : 'Bot'} is online.`))
	.catch((e) => console.log(`Failure connecting to Discord! ${e.message}!`))
