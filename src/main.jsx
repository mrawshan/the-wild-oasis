import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// To fix the styled component props issue in the console
import { StyleSheetManager } from 'styled-components';

// Error Boundaries basically reset the application if there are any errors on react rendering
import { ErrorBoundary } from 'react-error-boundary';

// ui component
import ErrorFallback from './ui/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<StyleSheetManager shouldForwardProp={() => true}>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => window.location.replace('/')}
			>
				<App />
			</ErrorBoundary>
		</StyleSheetManager>
	</React.StrictMode>
);
