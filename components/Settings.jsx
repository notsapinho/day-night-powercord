const { React } = require("powercord/webpack");
const { SliderInput, Category, TextInput, SwitchItem } = require("powercord/components/settings");

module.exports = class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categoryOpened: true };
    }

    render() {
        return (
            <div>
                <SliderInput
                    minValue={1000}
                    maxValue={60000}
                    stickToMarkers
                    disabled={this.props.getSetting("timeText", false)}
                    markers={[1000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000]}
                    defaultValue={60000}
                    initialValue={this.props.getSetting("rate", 60000)}
                    onValueChange={(val) => {
                        this.props.updateSetting("rate", Math.floor(parseInt(val)));
                        this.props.cycle();
                        this.props.createInterval();
                    }}
                    note="Change the time check rate."
                    onMarkerRender={(v) => `${Math.floor(v / 1000)}s`}
                >
                    Update rate
                </SliderInput>

                <Category
                    name="Text"
                    description="Toggle text in status."
                    opened={this.state.categoryOpened}
                    onChange={() =>
                        this.setState({
                            categoryOpened: !this.state.categoryOpened
                        })
                    }
                >
                    <SwitchItem
                        onChange={() => {
                            this.props.toggleSetting("timeText");
                            this.props.cycle();
                        }}
                        note={"Change the status text every minute to the current time."}
                        value={this.props.getSetting("timeText", false)}
                    >
                        Enable time in status
                    </SwitchItem>

                    <SwitchItem
                        onChange={() => {
                            this.props.toggleSetting("12format");
                            this.props.cycle();
                        }}
                        note={"Shows the time in the 12 hour format."}
                        value={this.props.getSetting("12format", false)}
                    >
                        12 hour format (AM/PM)
                    </SwitchItem>

                    <TextInput
                        onChange={(v) => {
                            this.props.updateSetting("statusText", v);
                            this.props.cycle();
                        }}
                        defaultValue={this.props.getSetting("statusText", "")}
                        disabled={this.props.getSetting("timeText", false)}
                        minLength={1}
                        maxLength={128}
                    >
                        Custom text for your status.
                    </TextInput>
                </Category>
            </div>
        );
    }
};
