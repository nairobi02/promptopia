import Nav from "@components/nav/Nav";
import "@styles/globals.css";
import Provider from "@components/Provider";
export const metadata = {
  title: "promptopia",
  description: "Discover and share prompts for writing, art, and more.",
};
const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
