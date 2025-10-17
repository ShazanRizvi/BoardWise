import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import {
  IconAlbum,
  IconActivity,
  IconAccessPoint,
  IconAppWindow,
  IconApiApp,
  IconAugmentedReality,
} from "@tabler/icons-react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  const IconSet = [
    IconAlbum,
    IconActivity,
    IconAccessPoint,
    IconAppWindow,
    IconApiApp,
    IconAugmentedReality,
  ];

  const itemIcons = useMemo(() => {
    return items.map(() => {
      const randomIndex = Math.floor(Math.random() * IconSet.length);
      return IconSet[randomIndex];
    });
  }, [items.length])

  

  return (
    <div
    className={cn(
      "grid grid-cols-4 md:grid-cols-2  lg:grid-cols-4 sm:grid-cols-2 py-5",
      className
    )}
  >
    {items.map((item, idx) => {
      const ItemIcon = itemIcons[idx];
      return (
        <Link
          to={item?.link}
          key={item?.link}
          className="relative group p-2 block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary-100/50 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center">
              <div className="bg-primary-200 p-2 rounded-lg mb-2 flex-shrink-0">
                <ItemIcon className="text-primary-900" size={40} stroke={2} />
              </div>
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            {item.people && (
              <div className="flex mt-5">
                <AnimatedTooltip
                  items={item.people}
                  onPersonClick={(person) => console.log(person)}
                />
              </div>
            )}
          </Card>
        </Link>
      );
    })}
  </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden border border-transparent bg-gradient-to-tr from-secondary-100/40  to-primary-100/40 dark:border-white/[0.2]  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn("text-primary-700 font-bold tracking-wide mt-2", className)}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-600 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
