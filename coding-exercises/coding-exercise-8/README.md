# 🗺 Coding Exercise 8 (Maps)

## Extinct & Endangered Languages, Dataset from [The Guardian](https://www.kaggle.com/the-guardian/extinct-languages)

➡️ SEE MY WORK [HERE](https://zoexiao0516.github.io/cdv-student/coding-exercises/coding-exercise-8/index.html).

OH MY GOD 😱 THIS EXERCISE TOOK ME SO MUCH TIME TO FINISH!!!

STEPS I use to finish this exercise:
1. Find this cool dataset. I had this idea of visualizing all the languages in the world two weeks ago, and during dataset searching, I found this dataset. I thought maybe visualizing endangerged & extinct languages and how they spread around the world would be more interesting and make more sense. And by visualization, we do see that it's a global issue.

1. Clean the dataset. I deleted some irrelevant columns and kept the name of the language as well as the longitude and latitude where the language is and was originated. 

1. Create a responsive D3 World Map with zoom and pan limits. So for the map to be more meaningful, I think it's best if we can zoom in the map (not the webpage). And I find there are some examples which I can learn from. However, making the datapoints move together with the geojson underneath really took me some time to learn.

1. Divide the datapoints into three groups: Vulnerable (most children speak the language, but it may be restricted to certain domains), Endangered, Extinct (no speakers left). I use the chechbox to hide and show each group. If none checked, there is a clean map for you.