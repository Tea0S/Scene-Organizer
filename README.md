# Scene-Organizer
A quick and dirty set of scripts and templates to be used in Obsidian for Roleplayers.

![Watch The Tutorial](https://youtu.be/r8AhW_cVHHM)
## Requirements
In order for this system to work you need the following plugins: 
- Templater
- QuickAdd
- Commander (Optional but nice)

# Installation
Add the files to your Templates folder in your obsidian vault whereever that may be. 

RP Scene Starter should be assigned as a Trigger Template/ File Regex Template in Templater. For ease of use I would just set the File Regex to .* as the script only scans for the 'RP Scenes' folder anyhow.

To Automate the process of scene creation go into QuickAdd, Add a new macro under whatever name you want and 'Add Choice'.
Click the gear icon and under User Scripts, add the new-rp-scene script. you can close the window now. In order to make this Macro available as a command be sure to click the lightning bold next to in settings before closing out of settings 

**Optional**: Using commander you can now add the Macro command from Quick Add as a button in one of the various UI placements. I prefer the ribbon. Go to Commander > Ribbon > Add Command. you should be able to search by QuickAdd: WhateverYouNamedYourCommand and add it from here
## Default Properties
By default the Template for new scenes uses the following properties:
Characters(list) - auto picked based on script logic
Roleplay(list) - auto picked based on script logic
Is Scene?(checkbox) - defaults to checked, I use this for sorting my own Bases for my thread trackers, you can remove this from the template if you don't need it
Is Active?(checkbox) - defaults to checked, Again, use for my Bases to filter out scenes that are currently active or not
Replied? - defaults to unchecked, used for my manual tracking for if I owe a reply in a specific scene

I've included my Roleplay Tracker base that has this filtering preapplied if that is useful for you.

## How it works
Using Javascript and a Templater template, I auto assign various properties to a file based on its name and location with in a Vault. By default this system looks for the file anywhere in the 'RP Scenes' folder in a vault. From there it takes the Character's name from the title where the format should be `Character Names` - `Scene name` and it will automatically set the Character property for example naming the scene

**Cana - Into the Belly of the Beast**

Will set the character property to `Cana`.
This works with multiple characters in the file as long as they use a punctuation mark such as & or , to delineate the names. It will always stop scanning for the characters after the -. This can be changed to any other symbol 


and then it pulls the `Roleplay` property from whatever the next top level folder after RP Scenes is. 

For example, my personal file tree looks like this: 

```
RP Scenes
  For The Greeks
    Twin Flames
    Bunnie & Wolf
  Prythian Prophecies
  Fourth Wing RP
```
In the case of this file tree, any scene made under 'For The Greeks' regardless of the character pair folders I have stored there will tag the roleplay as 'For The Greeks'

This template can be used retroactively on anyfile and it will rescan the location and title to grab the character and roleplay of that file.

**When using a QuickAdd macro**, you will be prompted first where you would like the scene to be added. You can even add a new folder to the path here so if you wanted a new section in For The Greeks for a new set of character you click '+ New folder path' and give it For The Greeks/whatever and it will make the path. Otherwise click one of your existing paths. From there name your scene with the characters first as above. 



