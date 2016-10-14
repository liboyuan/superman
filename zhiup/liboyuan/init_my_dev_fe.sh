#!/bin/bash
username=`whoami`
cd "/home/$username/git/"

if [ ! -e "/home/$username/git/fe" ]
then
    git clone git@localhost:zhiup/fe.git
fi

ln -nfs "/home/$username/git/fe" "/home/$username/www/fe"
