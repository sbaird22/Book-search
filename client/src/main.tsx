import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: '/graphql', // Backend GraphQL endpoint
    cache: new InMemoryCache(),
});

// Create React Router
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1 className="display-2">Wrong page!</h1>,
        children: [
        {
            index: true,
            element: <SearchBooks />,
        },
        {
            path: '/saved',
            element: <SavedBooks />,
        },
        ],
    },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
);
