const mg = require('mongoose');
const { AssignmentModel } = require('../models/assignment');

(async () => {
    try {
        const config = await mg.connect(process.env.MONGODB_URI);
        console.log('connected to DB:', config.connection.db.databaseName);

        console.log('Dropping assignments collection...')
        await config.connection.db.dropCollection('assignments');
        const assignments = [
            {
                name: "Silly CIA (Part 1)",
                identifier: "silly-cia-part-1",
                prerequisite: null,
                url: "https://scrimba.com/learn/bootcampprimer/assignment-silly-cia-part-1-cmkeLgAM",
                sortKey: 0
            },
            {
                name: "Silly CIA (Part 2)",
                identifier: "silly-cia-part-2",
                prerequisite: "silly-cia-part-1",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-silly-cia-part-2-cWQerwtR",
                sortKey: 1
            },
            {
                name: "CSS Wars: The Selector Awakens",
                identifier: "css-wars-the-selector-awakens",
                prerequisite: "silly-cia-part-2",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-css-wars-the-selector-awakens-cemQvvTa",
                sortKey: 2
            },
            {
                name: "Color Grid",
                identifier: "color-grid",
                prerequisite: "css-wars-the-selector-awakens",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-color-grid-from-scratch-cvzap4hb",
                sortKey: 3
            },
            {
                name: "CSS Flags",
                identifier: "css-flags",
                prerequisite: "color-grid",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-css-flags-cvzapasd",
                sortKey: 4
            },
            {
                name: "Design a Blog",
                identifier: "design-a-blog",
                prerequisite: "css-flags",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-design-a-blog-cvzapeCP",
                sortKey: 5
            },
            {
                name: "Grocery Store",
                identifier: "grocery-store",
                prerequisite: "design-a-blog",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-grocery-store-js-cGe23Wcv",
                sortKey: 6
            },
            {
                name: "If Statement Olympics",
                identifier: "if-statement-olympics",
                prerequisite: "grocery-store",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-if-statement-olympics-cWQe8duV",
                sortKey: 7
            },
            {
                name: "Even/Odd Looping",
                identifier: "even-odd-looping",
                prerequisite: "if-statement-olympics",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-even-odd-looping-cryP79CM",
                sortKey: 8
            },
            {
                name: "Loops and Array Practice",
                identifier: "loops-and-arrays-practice",
                prerequisite: "even-odd-looping",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-loops-and-arrays-practice-ca3mNMhW",
                sortKey: 9
            },
            {
                name: "Functions Exercise",
                identifier: "functions-exercise",
                prerequisite: "loops-and-arrays-practice",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-functions-exercise-ca3mN6HM",
                sortKey: 10
            },
            {
                name: "Social JS",
                identifier: "social-js",
                prerequisite: "functions-exercise",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-social-js-cVyzKDfD",
                sortKey: 11
            },
            {
                name: "Loop Olympics",
                identifier: "loop-olympics",
                prerequisite: "social-js",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-loop-olympics-ca3mNKCk",
                sortKey: 12
            },
            {
                name: "Daily Planet Editor",
                identifier: "daily-planet-editor",
                prerequisite: "loop-olympics",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-daily-planet-editor-cwyzqPUz",
                sortKey: 13
            },
            {
                name: "Log Document",
                identifier: "log-document",
                prerequisite: "daily-planet-editor",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-log-document-to-the-console-cy6g7zCM",
                sortKey: 14
            },
            {
                name: "Get Element By ID",
                identifier: "get-element-by-id",
                prerequisite: "log-document",
                url: "https://scrimba.com/learn/bootcampprimer/assignment-getelementbyid-c27rwau4",
                sortKey: 15
            },
            {
                name: "DJ JS",
                identifier: "dj-js",
                prerequisite: "get-element-by-id",
                url: "https://scrimba.com/learn/bootcampprimer/dj-js-event-listener-practice-cqRqPrtr",
                sortKey: 16
            },
        ]

        console.log('Adding assignments...')
        await AssignmentModel.insertMany(assignments);

        console.log('Success!');
        await mg.connection.close();

    } catch (err) {
        console.error(err);
    } finally {
        await mg.connection.close();
    }
})()