import Image from "next/image";

export const Card = () => {
    const customData = [
      {
        name: 'John Doe',
        designation: 'Software Engineer',
        badge: 'New',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        name: 'Jane Smith',
        designation: 'Product Designer',
        badge: 'VIP',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      {
        name: 'David Johnson',
        designation: 'Project Manager',
        badge: 'Manager',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      {
        name: 'Emily Davis',
        designation: 'UX/UI Designer',
        badge: 'Lead',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
      },
      // Add more users as needed
    ];
  
    return (
      <div
        style={{
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }}
        className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl"
      >
        <div className="bg-gray-100 h-full w-full rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden p-4">
          {customData.map((user, idx) => (
            <div
              key={`user-${idx}`}
              className="bg-white rounded-md cursor-pointer relative"
            >
              <div className="absolute top-2 right-2 rounded-full text-xs font-bold bg-white px-2 py-1">
                {user.badge}
              </div>

              <div className="p-4">
                <h1 className="font-semibold text-sm ">{user.name}</h1>
                <h2 className=" text-gray-500 text-xs ">{user.designation}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  