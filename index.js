const { getModule } = require("powercord/webpack");
const { Plugin } = require("powercord/entities");
const { getState } = getModule(["getStatus"], false);

module.exports = class DayNight extends (
    Plugin
) {
    async startPlugin() {
        this.emojisCycle = [
            { emoji: "🌆", from: 6, to: 7 },
            { emoji: "🌇", from: 8, to: 11 },
            { emoji: "🏙️", from: 12, to: 17 },
            { emoji: "🌃", from: 18, to: 23 }
        ];

        this.interval = setInterval(() => {
            this.cycle();
        }, 5000);
    }

    cycle() {
		const hours = new Date().getHours();
		const emoji = this.emojisCycle.find((obj) => obj.from <= hours && obj.to >= hours);

		if (getState().activities?.[window.DiscordNative.crashReporter.getMetadata().user_id]?.[0].emoji.name === emoji.emoji) return;

		this.setStatus({
			emojiName: emoji.emoji
		}); 
    }

    setStatus({ text, emojiName, emojiId }) {
        getModule(["updateRemoteSettings"], false).updateRemoteSettings({
            customStatus: {
                text,
                emojiName,
                emojiId
            }
        });
    }
    
    pluginWillUnload() {
		clearInterval(this.interval);
    }
};