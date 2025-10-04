import { Outlet, Link } from "react-router-dom";
import { Flame } from "lucide-react";

const Layout = () => {
	return (
		<>
			<header className="py-4 px-4 md:px-6">
				<div className="flex justify-center md:justify-start">
					<a href="/" className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<Flame className="size-4" />
						</div>
						sortify
					</a>
				</div>
			</header>
			{/* Shared components like a navbar can be put here.
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}

			<Outlet />
		</>
	);
};

export default Layout;
