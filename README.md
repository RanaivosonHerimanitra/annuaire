# annuaire

## Roadmap:

* Allow user send email via the interface
* Refactor data collection via forms
* Choose between aws or other option for cloud storage
* Use react if possible
* Make things reusable as soon as possible
* Build a better dashboard for monitoring activities

## Recipes:

### Connect to a remote db from mongo shell:

`mongo somewhere.mongolayer.com:port_number/dbname -u Yourusername -p Yourpassword`

### Remotely delete a collection from `Compose`:

`sudo curl -i -X DELETE 'https://api.compose.io/.../collections/collectionName' \
-H 'Content-Type: application/json' \
-H 'Accept-Version: yyyy-mm' \
-H 'Authorization: Bearer blabla....'`

### Import a csv to `compose`:

`mongoimport --host=candidate.45.mongolayer.com --port 10805 -d dbname -c collectionName -u Yourusername -p Yourpassword --type csv --file NameOfFile.csv --headerline`

### Update fields given a condition in mongodb:

`db.corporation.update ({ FJ:1 },{$set:{FJ:"SA"}},{multi:true}  )`

Here, I change all obs. that have `FJ=1 to FJ=SA`
