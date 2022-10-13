import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import SideBar from "./ProfileSidebar";

const Profile = () => {
  const { auth } = useAuthContext();
  const Logout = useLogout();
  const signOut = async () => {
    await Logout();
  };

  return (
    <div class="container flex">
      <SideBar></SideBar>
      <div className="container flow flex">
        <div>
          <h2>
            Welcome, {auth.username}. Only visible to those who have logged in.
          </h2>
          <Link to={`/profile/${auth.username}/stats`}>
            <button className="sign-out" type="button">
              Stats
            </button>
          </Link>
          <button className="sign-out" type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
        <div style={{ flexBasis: "100%" }}>
          <p class="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
            doloribus esse nam laudantium maiores molestiae, accusantium veniam
            officia nulla debitis, dolorum laboriosam adipisci consequuntur ex
            quasi? Eligendi corporis nulla ipsum in ad veniam libero quis
            cumque, quod nesciunt doloremque officia illo molestiae iste id
            illum. Officia tempore in deleniti exercitationem, quidem ducimus
            non molestiae veritatis doloremque nihil recusandae natus vitae,
            quasi ex itaque voluptate. Doloribus, deleniti vero. Consequuntur
            voluptates obcaecati aperiam nemo minima. Tempora, incidunt amet.
            Totam tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
            quo explicabo, libero autem deserunt iste, consequuntur dolore
            asperiores quos inventore voluptas eius?
          </p>
        </div>
        <div class="chart flow">
          <p class="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
            doloribus esse nam laudantium maiores molestiae, accusantium veniam
            officia nulla debitis, dolorum laboriosam adipisci consequuntur ex
            quasi? Eligendi corporis nulla ipsum in ad veniam libero quis
            cumque, quod nesciunt doloremque officia illo molestiae iste id
            illum. Officia tempore in deleniti exercitationem, quidem ducimus
            non molestiae veritatis doloremque nihil recusandae natus vitae,
            quasi ex itaque voluptate. Doloribus, deleniti vero. Consequuntur
            voluptates obcaecati aperiam nemo minima. Tempora, incidunt amet.
            Totam tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
            quo explicabo, libero autem deserunt iste, consequuntur dolore
            asperiores quos inventore voluptas eius?
          </p>
        </div>
        <div class="chart flow">
          <p class="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
            doloribus esse nam laudantium maiores molestiae, accusantium veniam
            officia nulla debitis, dolorum laboriosam adipisci consequuntur ex
            quasi? Eligendi corporis nulla ipsum in ad veniam libero quis
            cumque, quod nesciunt doloremque officia illo molestiae iste id
            illum. Officia tempore in deleniti exercitationem, quidem ducimus
            non molestiae veritatis doloremque nihil recusandae natus vitae,
            quasi ex itaque voluptate. Doloribus, deleniti vero. Consequuntur
            voluptates obcaecati aperiam nemo minima. Tempora, incidunt amet.
            Totam tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
            quo explicabo, libero autem deserunt iste, consequuntur dolore
            asperiores quos inventore voluptas eius?
          </p>
        </div>
        <div class="chart flow">
          <p class="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
            doloribus esse nam laudantium maiores molestiae, accusantium veniam
            officia nulla debitis, dolorum laboriosam adipisci consequuntur ex
            quasi? Eligendi corporis nulla ipsum in ad veniam libero quis
            cumque, quod nesciunt doloremque officia illo molestiae iste id
            illum. Officia tempore in deleniti exercitationem, quidem ducimus
            non molestiae veritatis doloremque nihil recusandae natus vitae,
            quasi ex itaque voluptate. Doloribus, deleniti vero. Consequuntur
            voluptates obcaecati aperiam nemo minima. Tempora, incidunt amet.
            Totam tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
            quo explicabo, libero autem deserunt iste, consequuntur dolore
            asperiores quos inventore voluptas eius?
          </p>
        </div>
        <div class="chart flow">
          <p class="text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nostrum
            doloribus esse nam laudantium maiores molestiae, accusantium veniam
            officia nulla debitis, dolorum laboriosam adipisci consequuntur ex
            quasi? Eligendi corporis nulla ipsum in ad veniam libero quis
            cumque, quod nesciunt doloremque officia illo molestiae iste id
            illum. Officia tempore in deleniti exercitationem, quidem ducimus
            non molestiae veritatis doloremque nihil recusandae natus vitae,
            quasi ex itaque voluptate. Doloribus, deleniti vero. Consequuntur
            voluptates obcaecati aperiam nemo minima. Tempora, incidunt amet.
            Totam tenetur harum sequi, magni quos possimus ea. Nulla excepturi,
            quo explicabo, libero autem deserunt iste, consequuntur dolore
            asperiores quos inventore voluptas eius?
          </p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
