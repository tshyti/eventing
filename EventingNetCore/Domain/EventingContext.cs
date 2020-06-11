using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Domain.Entities;
using Domain.Entities.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public partial class EventingContext :
        IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>,
        ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EventingContext(DbContextOptions<EventingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EventTags> EventTags { get; set; }
        public virtual DbSet<Events> Events { get; set; }
        public virtual DbSet<Tags> Tags { get; set; }
        public virtual DbSet<UserEvents> UserEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            modelBuilder.Entity<EventTags>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Eventid).HasColumnName("eventid");

                entity.Property(e => e.Tagid).HasColumnName("tagid");

                entity.HasOne(d => d.Event)
                    .WithMany()
                    .HasForeignKey(x => x.Eventid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("EventTags_eventid_fkey");

                entity.HasOne(d => d.Tag)
                    .WithMany()
                    .HasForeignKey(x => x.Tagid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("EventTags_tagid_fkey");
            });

            modelBuilder.Entity<Events>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn).HasDefaultValueSql("now()");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.ApplicationUser)
                    .WithMany(p => p.Events)
                    .HasForeignKey(x => x.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("events_created_by_fk");
            });

            modelBuilder.Entity<Tags>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.CreatedOn).HasDefaultValueSql("now()");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<UserEvents>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Eventid).HasColumnName("eventid");

                entity.Property(e => e.Userid)
                    .IsRequired()
                    .HasColumnName("userid");

                entity.HasOne(d => d.Event)
                    .WithMany()
                    .HasForeignKey(x => x.Eventid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("userevents_eventid_fkey");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(x => x.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("userevents_userid_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}