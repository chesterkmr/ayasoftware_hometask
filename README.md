# How to start

1. Create `.env` file in root folder
2. Copy contents of `.env.example` to `.env` or feel free to create own `.env` file following example.
3. Start database running `docker-compose.yaml` from `/db` folder or simply run following in terminal `docker-compose -f ./db/docker-compose.yaml up -d`
4. Install dependencies using `yarn`
5. Seed database using script `yarn run seed`
6. Run application using `yarn start`

# Exchangers data

Test data present in repository in file `exchange-offices.txt`.
After changes to test data and before seeding DB must be dumped.

## Endpoints

`/exchanger/top` - Returns top N exchangers for each country.
Accepts param `limit`,defaults to `3`

# Q/A

1.  How to change the code to support different file format versions?

- Implement parsers for different formats using `IDataParser`.
- Imlement manager which will resolve provided format to parser.
- Update `IExchangeOfficesSource` adapters to work with manager

2. How will the import system change if in the future we need to get this data from a web API?

- Source adapter internals will be updated to work with API,rest logic won't be touched and will keep work as it did.

3.  If in the future it will be necessary to do the calculations using the national bank rate, how could this be added to the system?

    I see slow & accurate and quick variants

    slow - fetching relevant rates,map transactions with rates and do calculations,rework query implementation(get rid of raw sql since it works only with DB data and fetched rates isnt there)

    quick - poll rates from bank by cron or when bank reports(with webhook ?) new rates.
    I assume that quick variant could be achieved by implementing service which will handle new rates and update DB

4.  How would it be possible to speed up the execution of requests if the task allowed you to update market data once a day or even less frequently? Please explain all possible solutions you could think of.

- Store all results in DB so in future this data could be accessed
- key/value storage(redis?)
- Store data in slices in some time series DB(Influx?)And querying only data that is in range of request,should work faster than do same operations using regular DB
- Storing data slices in CDN
