run:aesTest
	./aesTest

aesTest:lenAES.h lenAES.cpp aesTesting.cpp
	gcc -Wall aesTesting.cpp lenAES.cpp -o aesTest -lm

lenAES.cpp:../lenAES.cpp
	cp ../lenAES.cpp .

lenAES.h:../lenAES.h
	cp ../lenAES.h .
