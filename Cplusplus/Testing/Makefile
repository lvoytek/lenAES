run:aesTest
	./aesTest

aesTest:lenAES.h lenAES.cpp aesTesting.cpp
	gcc -Wall lenAES.cpp  aesTesting.cpp -o aesTest

lenAES.cpp:../lenAES.cpp
	cp ../lenAES.cpp .

lenAES.h:../lenAES.h
	cp ../lenAES.h .
