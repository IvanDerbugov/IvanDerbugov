document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.linkToSignUp').forEach(function (btn) {
        btn.addEventListener('click', function () {
            window.open('signUp.html', '_blank');
        });
    });

    document.querySelectorAll('.linkToRankings').forEach(function (btn) {
        btn.addEventListener('click', function () {
            window.open('topCreators.html', '_blank');
        });
    });

    document.querySelectorAll('.linkToMarketplace').forEach(function (btn) {
        btn.addEventListener('click', function () {
            window.open('marketplace.html', '_blank');
        });
    });
});


document.querySelectorAll('.linkToMetamask').forEach(function (btn) {
    btn.addEventListener('click', function () {
        window.open('https://metamask.io/ru', '_blank');
    });
});


document.querySelectorAll('.linkToWalletConnect').forEach(function (btn) {
    btn.addEventListener('click', function () {
        window.open('https://walletconnect.network/', '_blank');
    });
});


document.querySelectorAll('.linkToCoinbase').forEach(function (btn) {
    btn.addEventListener('click', function () {
        window.open('https://www.coinbase.com/en-gb', '_blank');
    });
});





