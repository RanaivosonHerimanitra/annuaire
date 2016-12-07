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

### Delete a collection remotely from `Compose`:

`sudo curl -i -X DELETE 'https://api.compose.io/.../collections/collectionName' \
-H 'Content-Type: application/json' \
-H 'Accept-Version: yyyy-mm' \
-H 'Authorization: Bearer blabla....'`
