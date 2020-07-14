#!/usr/bin/env node

'use strict';

const fs = require('fs');
const {_checkDrive} = require('./drive');
const utils = require('./utils');

// base function for permissions resource's list method
function listPermissions(context, opts) {
    return utils.API(context, 'permissions', 'list', opts)
}

// lists permissions given file id or file name
listPermissionsFile = _checkDrive(listPermissionsFile)
async function listPermissionsFile({fileId, fileName} = {}, context) {
    return utils._collapseOptsToId(arguments[0], 'file', context)
    .then(async (result) => {
        await listPermissions(result[0], {fileId: result[1].fileId})
        context.permissions = context.responseData.permissions;
        return context;
    })
}

// lists permissions given file id
function listPermissionsFileId(fileId, context) {
    return listPermissionsFile({fileId}, context)
}

// lists permissions given file name
function listPermissionsFileName(fileName, context) {
    return listPermissionsFile({fileName}, context)
}

module.exports = {listPermissions, listPermissionsFile, listPermissionsFileId, listPermissionsFileName};