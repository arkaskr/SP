import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, LinkedinIcon, Code2Icon, PaintbrushIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SocialLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) => (
  <Button
    variant="ghost"
    size="icon"
    asChild
    className="h-8 w-8 md:h-10 md:w-10 hover:text-foreground"
  >
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon className="h-4 w-4 md:h-5 md:w-5" />
    </Link>
  </Button>
);

interface DepartmentHeaderProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const DepartmentHeader: React.FC<DepartmentHeaderProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-4 mb-8">
    <div className="p-3 bg-primary/10 rounded-lg">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export const TechTeam = () => {
  const teamMembers = [
    {
      name: "Mourya Saha",
      role: "Frontend Developer",
      expertise: ["React", "UI/UX", "NextJs"],
      image:
        "/assets/images/mourya.jpg",
      department: "Frontend",
      dept: "Computer Science and Engineering",
      bio: "Jadavpur University",
      social: {
        github: "https://github.com/Mourya2044",
        linkedin: "https://www.linkedin.com/in/mourya-saha",
      },
    },
    {
      name: "Arka Dutta",
      role: "Backend Developer",
      expertise: ["NextJs", "Database"],
      image:
        "/assets/images/Arka_Dutta.jpg",
      department: "Backend",
      dept: "Computer Science and Engineering",
      bio: "Jadavpur University",
      social: {
        github: "https://github.com/ArkaDutta-Maker",
        linkedin: "https://www.linkedin.com/in/arka-dutta-282b22287",
      },
    },
    {
      name: "Arpan Koley",
      role: "Backend Developer",
      expertise: ["Machine Learning", "Python"],
      image:
        "/assets/images/arpan.jpg",
      department: "Backend",
      dept: "Computer Science and Engineering",
      bio: "Jadavpur University",
      social: {
        github: "https://github.com/arpan1108ju",
        linkedin: "https://www.linkedin.com/in/arpan-koley-9a197423a",
      },
    },
    {
      name: "Md Khalid Saifullah",
      role: "Frontend Developer",
      expertise: ["React", "UI/UX"],
      image:
        "/assets/images/khalid.jpg",
      department: "Frontend",
      dept: "Computer Science and Engineering",
      bio: "Jadavpur University",
      social: {
        github: "https://github.com/MdKhalid871",
        linkedin: "https://www.linkedin.com/in/md-khalid-a3158b287",
      },
    },
    // {
    //   name: "Sarika Khatun",
    //   role: "Frontend Developer",
    //   expertise: ["React", "UI/UX"],
    //   image:
    //     "https://media.licdn.com/dms/image/v2/D5603AQH1RE9P_gu7RQ/profile-displayphoto-shrink_400_400/B56ZScvg18GUAg-/0/1737796489372?e=1743033600&v=beta&t=KtM7EUkA9TYOXBF_K00RfKc37nDiMYifKKvI-r-mWsM",
    //   department: "Frontend",
    //   bio: "Student at Jadavpur University",
    //   social: {
    //     github: "https://github.com/Sarika7422",
    //     linkedin: "https://www.linkedin.com/in/sarika-khatun-478102285",
    //   },
    // },
  ];

  const frontendTeam = teamMembers.filter(member => member.department === "Frontend");
  const backendTeam = teamMembers.filter(member => member.department === "Backend");

  interface TeamMember {
    name: string;
    role: string;
    expertise: string[];
    image: string;
    department: string;
    dept: string;
    bio: string;
    social: {
      github: string;
      linkedin: string;
    };
  }

  const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <Card className="bg-background hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/3]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
      </div>
      <CardContent className="p-4 md:p-6 flex flex-col justify-around space-y-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg md:text-xl font-bold" style={{whiteSpace: "nowrap"}}>{member.name}</h3>
            <div className="flex gap-1">
              <SocialLink
                icon={GithubIcon}
                href={member.social.github}
                label="GitHub Profile"
              />
              <SocialLink
                icon={LinkedinIcon}
                href={member.social.linkedin}
                label="LinkedIn Profile"
              />
            </div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            {member.role}
          </p>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground">
          {member.dept}
        </p>
        <p className="text-xs md:text-sm text-muted-foreground">
          {member.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {member.expertise.map((skill, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs md:text-sm text-foreground"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-8 md:py-16 bg-muted/50" id="team">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">The Synergy</h2>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            Our technology team brings together talented engineers and
            developers who are passionate about building innovative solutions
            and pushing the boundaries of what{"'"}s possible.
          </p>
        </div>

        <div className="space-y-16">
          {/* Frontend Section */}
          <div>
            <DepartmentHeader 
              icon={PaintbrushIcon}
              title="Frontend Team"
              description="Crafting beautiful and intuitive user experiences"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {frontendTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Backend Section */}
          <div>
            <DepartmentHeader 
              icon={Code2Icon}
              title="Backend Team"
              description="Building robust and scalable system architecture"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {backendTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTeam;