export const APP_LAST_URI = Object.freeze({
    ADMIN : {
        signin : {
            path : 'v1/user/admin-login',
            method : 'POST'
        },
        signup : {
            path : 'v1/user/register-adminuser',
            method : 'POST'
        },
        category_list : {
            path : 'v1/category/category-list',
            method : 'POST'
        },
        category_add : {
            path : 'v1/category/category-add',
            method : 'POST'
        },
        getCategoryById : {
            path : 'v1/category/category-edit',
            method : 'POST'
        },
        category_update : {
            path : 'v1/category/category-update',
            method : 'POST'
        },
        category_delete : {
            path : 'v1/category/category-delete',
            method : 'POST'
        },
        category_add_csv : {
            path : 'v1/category/category-add-csv',
            method : 'POST'
        },
        question_list : {
            path : 'v1/question/question-list',
            method : 'POST'
        },
        question_add : {
            path : 'v1/question/question-add',
            method : 'POST'
        },
        question_edit : {
            path : 'v1/question/question-edit',
            method : 'POST'
        },
        question_update : {
            path : 'v1/question/question-update',
            method : 'POST'
        },
        question_delete : {
            path : 'v1/question/question-delete',
            method : 'POST'
        }
    }
})