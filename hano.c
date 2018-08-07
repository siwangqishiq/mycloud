/*************************************************************************
    > File Name: hano.c
    > Author: panyi
    > Mail: 525647740@qq.com 
    > Created Time: 二  8/ 7 12:42:13 2018
 ************************************************************************/

#include<stdio.h>

/**
 *move No. = n from A to B by C
 */
void hano(int n , char from , char by , char to){
	if(n == 1){
		printf("move %d from %c to %c \n" , n ,from ,to);
	}else{
		hano(n - 1 , from , to , by);
		printf("move %d from %c to %c \n" , n, from , to);
		hano(n - 1, by , from ,to);
	}
}


int main(int argc , char *argv[]){
	hano(100 , 'A' ,'B' ,'C');
	return 0;
}
