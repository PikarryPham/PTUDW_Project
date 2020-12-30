const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
};

module.exports = schemaOptions;