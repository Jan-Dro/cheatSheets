'use client'
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useState } from "react";
import { commands } from "@/config/commands";
import SideNav from "@/components/SideNav";
import CommandList from "@/components/CommandList";
import { Divider} from '@nextui-org/divider'
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {Code} from "@nextui-org/code";
import { useSearch } from "@/config/SearchContext";

interface Command {
  command: string;
  description: string;
}

interface Category {
  title: string;
  commands: Command[];
}
export default function Home() {
  const [openIndices, setOpenIndices] = useState<{ [key: number]: boolean }>({}); // Using boolean to track open/close state
  const { searchTerm } = useSearch();

  const categories = [
    {
      title: "Setup and Config",
      commands: [
        { command: 'git config --global user.name "name"', description: 'Sets the name to be attached to your commit transactions' },
        { command: 'git config --global user.email "email"', description: 'Sets the email to be attached to your commit transactions' }
      ]
    },
    {
      title: "Basic Commands",
      commands: [
        { command: 'git init', description: 'Initializes a new Git repository' },
        { command: 'git clone [url]', description: 'Clones a repository into a new directory' }
      ]
    },
    {
      title: "Daily Use",
      commands: [
        { command: 'git status', description: 'Displays the state of the working directory and staging area' },
        { command: 'git add [file]', description: 'Adds a file as it looks now to your next commit (stage)' },
        { command: 'git commit -m "[message]"', description: 'Commits your staged content as a new commit snapshot' }
      ]
    },
    {
      title: "Branching and Merging",
      commands: [
        { command: 'git branch', description: 'Lists all local branches in the current repository' },
        { command: 'git branch [branch-name]', description: 'Creates a new branch' },
        { command: 'git checkout [branch-name]', description: 'Switches to the specified branch and updates the working directory' },
        { command: 'git merge [branch]', description: 'Merges the specified branch’s history into the current branch' }
      ]
    },
    {
      title: "Push and Pull",
      commands: [
        { command: 'git pull', description: 'Pulls changes from the remote repository' },
        { command: 'git push', description: 'Pushes all committed changes to the remote repository' }
      ]
    },
    {
      title: "Advanced",
      commands: [
        { command: 'git rebase', description: 'Reapply commits on top of another base tip' },
        { command: 'git stash', description: 'Stash the changes in a dirty working directory away' }
      ]
    }
  ];
  const filteredCategories = categories.map(category => ({
    ...category,
    commands: category.commands.filter(command =>
        command.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
})).filter(category => category.commands.length > 0);
  const toggleOpen = (categoryIndex: number) => {
    setOpenIndices(prevState => ({
      ...prevState,
      [categoryIndex]: !prevState[categoryIndex] // Toggle based on previous state
    }));
  };

  return (
    <Accordion
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
     {categories.map((category, index) => (
        <AccordionItem
          key={index}
          aria-label={category.title}
          title={category.title}
        >
          <div className="space-y-2">
            {category.commands.map((command, cmdIndex) => (
              <div key={cmdIndex} className="text-white">
                <Code color="primary">{command.command}</Code>
                <p>{command.description}</p>
              </div>
            ))}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}