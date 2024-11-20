"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */

export default {
    _meta: {
        version: 1,
    },
    setup: (options, seedLink) => {
        dbm = options.dbmigrate;
        type = dbm.dataType;
        seed = seedLink;
    },
    up: (db) => {
        return db.createTable("users", {
            id: { type: "int", primaryKey: true, autoIncrement: true },
            name: { type: "string" },
            email: { type: "string", unique: true },
        });
    },
    dowm: (db) => {
        return db.dropTable("users");
    },
};
