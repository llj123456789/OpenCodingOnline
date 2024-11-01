#include<iostream>
#include<fstream>
#include<string>

using namespace std;

int main()
{
    cout<<"Content-type:text/html\r\n\r\n";
    fstream f("./test.html");
    string content;
    while(getline(f,content))
    {
        cout<<content<<endl;
    }
    f.close();

    return 0;

}