// ui components
import Heading from '../ui/Heading';
import Row from '../ui/Row';

// features
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

function Settings() {
	return (
		<Row>
			<Heading as='h1'>Update hotel settings</Heading>
			<UpdateSettingsForm />
		</Row>
	);
}

export default Settings;
