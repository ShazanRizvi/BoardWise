import { useState } from "react";
import { Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";


const Navbar = () => {
     const [active, setActive] = useState(null);
  return (
     <div
      className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50 border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-black rounded-full shadow-lg")}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <h2 href="/web-dev">Web Development</h2>
            <h2 href="/interface-design">Interface Design</h2>
            <h2 href="/seo">Search Engine Optimization</h2>
            <h2 href="/branding">Branding</h2>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact Us">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <h2 href="/hobby">Hobby</h2>
            <h2 href="/individual">Individual</h2>
            <h2 href="/team">Team</h2>
            <h2 href="/enterprise">Enterprise</h2>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Sign up">
          <div className="flex flex-col space-y-4 text-sm">
            <h2 href="/login">Login</h2>
          </div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Navbar
