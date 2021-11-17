(() => {
    const routesNotVerified = [
        '/login'
    ]

    if(location.pathname.includes(routesNotVerified)){
        return
    }

    const token = localStorage.getItem('@token')

    if(!token || token.length < 10){
        location.href = '/login'
    }
})()