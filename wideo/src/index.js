import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./context/auth-context";
import { UserDataProvider } from "./context/data-context";
import { VideoListingProvider } from "./context/listing-context";
import { BrowserRouter as Router } from "react-router-dom";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
   	<Router>
			<AuthProvider>
				<UserDataProvider>
					<VideoListingProvider>
						<App />
					</VideoListingProvider>
				</UserDataProvider>
			</AuthProvider>
		</Router>
  </React.StrictMode>,
  document.getElementById("root")
);
