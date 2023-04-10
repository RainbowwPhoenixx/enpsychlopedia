# Enpsychlopedia

This website's aim is to collect and nicely display running gags in the Psych TV show.
Big WIP energy.

This work is inspired by:
* https://apps.npr.org/arrested-development/
* http://psychphrences.net
* https://github.com/damorb/psychphinder
* http://communitypoprefs.com/

## Contributing

* If you would like to add an instance of a running gag or suggest a new running gag, please open an issue. You can also PR if you are adding a lot of them at once.
* Contributions to the site's code itself are welcome. However, this project is a way for me to learn web dev, so please avoid complete refactors or big changes.

## Sources

* https://psychusa.fandom.com/wiki/List_of_Pineapple_Appearances
* http://psychphrences.net
* https://github.com/damorb/psychphinder (for the subtitle data that is easy to search through)


## Planned features

* Ability to see multiple descriptions per episode (and general looks improvements on the description)
* Ability to see the list of running gags per episode, so that this website can act as a guide for a rewatch
    * Impl #1: Go through all the running gags CSVs get all the gags for a given episode (very bad)
    * Impl #2: Have a script automatically generate episode CSVs from the running gag CSVs (slighly annoying)
    * Impl #3: Have the gags be collected in a database (most efficient but impossible with github-pages)
* When an episode is selected, display the various instances of a gag on a timeline, display details when hovering or something
* A nice logo!
    * A book with a pineapple on it
* Ability to filter for some running gags, eg: for references filter by type (movie, TV, ect)
    * Add subelements in the sidebar with `data-filter` attributes
