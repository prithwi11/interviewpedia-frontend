export const APP_LAST_URI = Object.freeze({
    ADMIN : {
        signin : {
            path : 'v1/user/admin-login',
            method : 'POST',
            isAuth : false,
        },
        signup : {
            path : 'v1/user/register-adminuser',
<<<<<<< HEAD
            method : 'POST'
=======
            method : 'POST',
            isAuth : true,
        },
        category_list : {
            path : 'v1/category/category-list',
            method : 'POST',
            isAuth : true,
        },
        category_add : {
            path : 'v1/category/category-add',
            method : 'POST',
            isAuth : true,
        },
        getCategoryById : {
            path : 'v1/category/category-edit',
            method : 'POST',
            isAuth : true,
        },
        category_update : {
            path : 'v1/category/category-update',
            method : 'POST',
            isAuth : true,
        },
        category_delete : {
            path : 'v1/category/category-delete',
            method : 'POST',
            isAuth : true,
        },
        category_add_csv : {
            path : 'v1/category/category-add-csv',
            method : 'POST',
            isAuth : true,
        },
        question_list : {
            path : 'v1/question/question-list',
            method : 'POST',
            isAuth : true,
        },
        question_add : {
            path : 'v1/question/question-add',
            method : 'POST',
            isAuth : true,
        },
        question_edit : {
            path : 'v1/question/question-edit',
            method : 'POST',
            isAuth : true,
        },
        question_update : {
            path : 'v1/question/question-update',
            method : 'POST',
            isAuth : true,
        },
        question_delete : {
            path : 'v1/question/question-delete',
            method : 'POST',
            isAuth : true,
>>>>>>> a954112... Question module and Authentication module done
        }
    }
})