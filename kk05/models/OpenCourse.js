module.exports = (sequelize, Types) => {
    const OpenCourse = sequelize.define('OpenCourse', {
        name: Types.STRING(50),
        description: Types.STRING(100),
        time: Types.DATE,
        count: Types.INTEGER
    }, {
        tableName: 'open_courses',
        timestamps: false
    })
    OpenCourse.sync();
    return OpenCourse;
}