## 1. Problem

Convert your week-6-task database into a RDBMS using `POSTRESQL`. 
- Create a table for `organization`, should hold all details except products, noOfEmployees and products.
- Create a table for `employees` should hold names of employees,
- Create a table for `products`, should hold product's names
- Return the same information as specified from last weeks task.
- Add a `signup` and `login` routes
- Only registered users can access all `endpoints`

Test Coverage:
- Same test case from week-6-task-one



## 2.  Setup

- Find the sql file in week 7 files 

Uncompress the provided `geographySummarySql/import.sql.zip` file and use the included script to set up a database using [sqlite](https://www.sqlite.org/download.html).

### Introduction

We'd like you to create a summary report for Long Rains Season 2011. This report should show for the Long Rains Season of 2011 how many clients and groups there are, together with their combined land sizes in each district, sector, and site. A district has several sectors, made up out of sites, with each site made up out of several groups of farmers.The land size of a client for an input is recorded together with their input choice (e.g. WS 505 Maize seed).

### Notes

- There is only one district in the provided data
- Some clients are dropped, i.e. no longer active. These clients should be excluded from your calculations
- We also have 'add-on' products like solar lights. The lands for these add-ons is recorded as -1 but this should not be included in land size calculations

### Task

Write a `SELECT` statement in the provided `geographySummarySql/SiteSummary.sql` to generate the report by site for Long Rains 2011. Include District, Season, Sector, Site, GroupCount, ClientCount, and TotalLandSize. You should order alphabetically by Sector and then by Site.
# week-7-task
